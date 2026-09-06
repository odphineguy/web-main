"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type * as Three from "three";
import styles from "./ScrollMotionLab.module.css";

type ScrollMotionLabProps = {
  locale: string;
};

const panels = [
  { src: "/images/motion-lab/fleet.webp", label: { en: "Dispatch command", es: "Centro de dispatch" }, position: "center" },
  { src: "/images/motion-lab/crm.webp", label: { en: "Customer records", es: "Registros de clientes" }, position: "center" },
  { src: "/images/motion-lab/accounting.webp", label: { en: "Accounting view", es: "Vista contable" }, position: "center" },
  { src: "/images/motion-lab/laptop.webp", label: { en: "Fleet operations", es: "Operación de flota" }, position: "center" },
  { src: "/images/motion-lab/driver-app.webp", label: { en: "Driver mobile app", es: "App para conductores" }, position: "center" },
  { src: "/images/motion-lab/ai-agent.webp", label: { en: "AI agent", es: "Agente de IA" }, position: "center" },
  { src: "/images/motion-lab/turf-after.webp", label: { en: "Visual estimate", es: "Estimado visual" }, position: "center" },
  { src: "/images/motion-lab/paint-after.webp", label: { en: "Design preview", es: "Vista previa" }, position: "center" },
  { src: "/images/motion-lab/door-after.webp", label: { en: "Customer approval", es: "Aprobación del cliente" }, position: "center" },
  { src: "/images/motion-lab/bilingual-build.webp", label: { en: "Bilingual build", es: "Sistema bilingüe" }, position: "center" },
] as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

type RibbonMesh = {
  geometry: Three.PlaneGeometry;
  material: Three.ShaderMaterial;
  mesh: Three.Mesh;
  restY: Float32Array;
  hoverScale: number;
};

export default function ScrollMotionLab({ locale }: ScrollMotionLabProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstWordRef = useRef<HTMLSpanElement>(null);
  const secondWordRef = useRef<HTMLSpanElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isSpanish = locale === "es";

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const firstWord = firstWordRef.current;
    const secondWord = secondWordRef.current;
    const support = supportRef.current;

    if (!section || !stage || !firstWord || !secondWord || !support) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;

    const render = () => {
      frame = 0;
      if (!visible || motionPreference.matches) return;

      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      const enter = smoothstep(0.02, 0.24, progress);
      const exit = smoothstep(0.72, 0.98, progress);
      // One linear crossing for the entire scroll range, without a center hold.
      // Actual word widths keep both languages fully offscreen at the endpoints.
      const width = stage.clientWidth;
      const firstX = -firstWord.offsetWidth + progress * (width + firstWord.offsetWidth);
      const secondX = width - progress * (width + secondWord.offsetWidth);

      stage.style.setProperty("--lab-progress", `${progress * 100}%`);
      stage.style.setProperty("--guide-rotation", `${-12 + progress * 28}deg`);
      firstWord.style.transform = `translate3d(${firstX}px, 0, 0)`;
      secondWord.style.transform = `translate3d(${secondX}px, 0, 0)`;
      support.style.opacity = String(clamp(enter * 1.8 - exit * 1.3));
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestRender();
    });

    observer.observe(section);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    motionPreference.addEventListener("change", requestRender);
    requestRender();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      motionPreference.removeEventListener("change", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!section || !canvas || motionPreference.matches) return;

    let cancelled = false;
    let visible = false;
    let frame = 0;
    let renderer: Three.WebGLRenderer | null = null;
    let scene: Three.Scene | null = null;
    let camera: Three.PerspectiveCamera | null = null;
    let ribbonGroup: Three.Group | null = null;
    let ribbonMeshes: RibbonMesh[] = [];
    let loadedTextures: Three.Texture[] = [];
    let raycaster: Three.Raycaster | null = null;
    let pointer: Three.Vector2 | null = null;
    let pointerInside = false;
    let lastFrameTime = 0;
    let contextLost = false;
    const hoverPreference = window.matchMedia("(hover: hover) and (pointer: fine)");

    // Reference measurements and capture workflow: docs/MOTION_LAB_HANDOFF.md.
    // Distance along a rising ribbon, with enough pitch to separate successive turns.
    const curveStart = 0;
    const curveEnd = Math.PI * 4;
    const curveCenter = Math.PI * 2;
    const radius = 12;
    const rise = 28 / curveEnd;
    const distancePerRadian = Math.hypot(radius, rise);
    const panelSpan = 5.8 / distancePerRadian;
    const panelStep = 6.2 / distancePerRadian;
    const contentSpan = panelStep * (panels.length - 1) + panelSpan;
    const panelHeight = 5.8 * (568 / 812);

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      return clamp(-rect.top / distance);
    };

    const updatePanel = (ribbonMesh: RibbonMesh, start: number) => {
      const position = ribbonMesh.geometry.attributes.position as Three.BufferAttribute;
      const uv = ribbonMesh.geometry.attributes.uv as Three.BufferAttribute;
      const positionArray = position.array as Float32Array;

      for (let vertex = 0; vertex < position.count; vertex += 1) {
        const u = uv.getX(vertex);
        const side = ribbonMesh.restY[vertex] >= 0 ? 1 : -1;
        const theta = start + panelSpan * 0.5 + (u - 0.5) * panelSpan * ribbonMesh.hoverScale;
        const cosine = Math.cos(theta);
        const sine = Math.sin(theta);
        const distanceFromCenter = (theta - curveCenter) / 2;
        const dip = 2.5 * Math.exp(-(distanceFromCenter * distanceFromCenter));
        const slope = rise + distanceFromCenter * dip;
        const centerX = radius * cosine;
        const centerY = -16 + rise * theta - dip;
        const centerZ = radius * sine;

        // Cross the tangent with the radial direction, then bias toward vertical.
        // This bends the image surfaces without independently spinning each card.
        let normalX = slope * sine;
        let normalY = radius;
        let normalZ = -slope * cosine;
        const normalLength = Math.hypot(normalX, normalY, normalZ);
        normalX /= normalLength;
        normalY = normalY / normalLength + 0.6;
        normalZ /= normalLength;
        const uprightLength = Math.hypot(normalX, normalY, normalZ);
        normalX /= uprightLength;
        normalY /= uprightLength;
        normalZ /= uprightLength;

        const offset = side * panelHeight * 0.5 * ribbonMesh.hoverScale;
        const arrayIndex = vertex * 3;
        positionArray[arrayIndex] = centerX + normalX * offset;
        positionArray[arrayIndex + 1] = centerY + normalY * offset;
        positionArray[arrayIndex + 2] = centerZ + normalZ * offset;
      }

      position.needsUpdate = true;
      // Raycasting must use the current deformed surface, not the original unit plane.
      ribbonMesh.geometry.computeBoundingSphere();
    };

    const renderRibbon = (timestamp: number) => {
      frame = 0;
      if (cancelled || contextLost) return;
      canvas.dataset.renderState = !visible ? "offscreen" : !ribbonGroup ? "initializing" : "ready";
      if (!visible || !renderer || !scene || !camera || !ribbonGroup) return;

      const elapsed = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 1000, 0.05) : 1 / 60;
      lastFrameTime = timestamp;
      const progress = readProgress();
      const travelStart = 25 / distancePerRadian - contentSpan;
      const firstPanelStart = travelStart + progress * (curveEnd - travelStart);

      ribbonMeshes.forEach((ribbonMesh, index) => {
        const panelStart = firstPanelStart + index * panelStep;
        const entrance = smoothstep(curveStart, curveStart + 0.15, panelStart);
        const departure = 1 - smoothstep(curveEnd - 0.15, curveEnd, panelStart);
        const opacity = clamp(entrance * departure);

        ribbonMesh.mesh.visible = opacity > 0.015;
        ribbonMesh.material.uniforms.uOpacity.value = opacity;
        if (ribbonMesh.mesh.visible) updatePanel(ribbonMesh, panelStart);
      });

      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      let hovered: Three.Object3D | undefined;
      if (pointerInside && hoverPreference.matches && !motionPreference.matches && raycaster && pointer) {
        raycaster.setFromCamera(pointer, camera);
        hovered = raycaster.intersectObjects(
          ribbonMeshes.filter(({ mesh }) => mesh.visible).map(({ mesh }) => mesh), false,
        )[0]?.object;
      }

      const blend = 1 - Math.pow(0.001, elapsed);
      let settling = false;
      ribbonMeshes.forEach((ribbonMesh, index) => {
        const target = ribbonMesh.mesh === hovered ? 1.12 : 1;
        const difference = target - ribbonMesh.hoverScale;
        if (Math.abs(difference) > 0.0001) {
          ribbonMesh.hoverScale += difference * blend;
          settling = true;
        } else {
          ribbonMesh.hoverScale = target;
        }
        if (ribbonMesh.mesh.visible) updatePanel(ribbonMesh, firstPanelStart + index * panelStep);
      });
      canvas.dataset.hoveredPanel = String(ribbonMeshes.findIndex(({ mesh }) => mesh === hovered));
      canvas.dataset.hoverScale = Math.max(1, ...ribbonMeshes.map(({ hoverScale }) => hoverScale)).toFixed(4);
      renderer.render(scene, camera);
      if (settling) requestRender();
      canvas.dataset.motionProgress = progress.toFixed(4);
      canvas.dataset.visiblePanels = String(ribbonMeshes.filter(({ mesh }) => mesh.visible).length);
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(renderRibbon);
    };

    const resumeRendering = () => {
      if (cancelled || document.hidden) return;
      const rect = section.getBoundingClientRect();
      visible = rect.bottom > 0 && rect.top < window.innerHeight;
      lastFrameTime = 0;
      requestRender();
    };
    const loseContext = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      canvas.dataset.renderState = "context-lost";
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const restoreContext = () => {
      contextLost = false;
      // Three restores its GPU resources; the on-demand scene also needs a new frame.
      resumeRendering();
    };

    const clearHover = () => {
      pointerInside = false;
      requestRender();
    };
    const movePointer = (event: PointerEvent) => {
      if (!pointer || event.pointerType === "touch" || !hoverPreference.matches) {
        clearHover();
        return;
      }
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1);
      pointerInside = true;
      requestRender();
    };

    const resize = () => {
      if (!renderer || !camera) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.fov = width < 760 ? 58 : width < 1200 ? 54 : 52;
      camera.position.z = width < 760 ? 28 : width < 1200 ? 24 : 22;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 760 ? 1.35 : 1.8));
      renderer.setSize(width, height, false);
      requestRender();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestRender();
    });

    observer.observe(section);
    canvas.addEventListener("webglcontextlost", loseContext);
    canvas.addEventListener("webglcontextrestored", restoreContext);
    window.addEventListener("pageshow", resumeRendering);
    window.addEventListener("focus", resumeRendering);
    document.addEventListener("visibilitychange", resumeRendering);
    section.addEventListener("pointermove", movePointer, { passive: true });
    section.addEventListener("pointerleave", clearHover);
    window.addEventListener("blur", clearHover);
    hoverPreference.addEventListener("change", clearHover);
    motionPreference.addEventListener("change", clearHover);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", resize);

    void import("three").then(async (THREE) => {
      if (cancelled) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
      camera.position.set(0, 0, 22);
      camera.lookAt(0, 0, 0);
      ribbonGroup = new THREE.Group();
      scene.add(ribbonGroup);

      canvas.dataset.renderState = "loading-images";
      const textureLoader = new THREE.TextureLoader();
      const textureResults = await Promise.allSettled(
        panels.map((panel) => textureLoader.loadAsync(panel.src)),
      );

      if (cancelled) {
        textureResults.forEach((result) => {
          if (result.status === "fulfilled") result.value.dispose();
        });
        // Cleanup already disposed this renderer when the effect was cancelled.
        return;
      }

      canvas.dataset.renderState = "images-loaded";
      const maximumAnisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      const fallbackPixel = new Uint8Array([231, 83, 11, 255]);

      loadedTextures = textureResults.map((result) => {
        const texture = result.status === "fulfilled"
          ? result.value
          : new THREE.DataTexture(fallbackPixel, 1, 1);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = maximumAnisotropy;
        texture.needsUpdate = true;
        return texture;
      });

      ribbonMeshes = loadedTextures.map((texture) => {
        const image = texture.image as { naturalWidth?: number; naturalHeight?: number; width?: number; height?: number } | undefined;
        const imageWidth = image?.naturalWidth ?? image?.width ?? 16;
        const imageHeight = image?.naturalHeight ?? image?.height ?? 10;
        const imageAspect = imageWidth / imageHeight;
        const panelAspect = 812 / 568;
        const uvScale = new THREE.Vector2(1, 1);
        const uvOffset = new THREE.Vector2(0, 0);

        if (imageAspect > panelAspect) {
          uvScale.x = panelAspect / imageAspect;
          uvOffset.x = (1 - uvScale.x) / 2;
        } else {
          uvScale.y = imageAspect / panelAspect;
          uvOffset.y = (1 - uvScale.y) / 2;
        }

        const geometry = new THREE.PlaneGeometry(1, 1, 116, 1);
        const positions = geometry.attributes.position.array as Float32Array;
        const restY = new Float32Array(geometry.attributes.position.count);
        for (let vertex = 0; vertex < restY.length; vertex += 1) {
          restY[vertex] = positions[vertex * 3 + 1];
        }

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uMap: { value: texture },
            uOpacity: { value: 1 },
            uUvScale: { value: uvScale },
            uUvOffset: { value: uvOffset },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uMap;
            uniform float uOpacity;
            uniform vec2 uUvScale;
            uniform vec2 uUvOffset;
            varying vec2 vUv;
            void main() {
              vec2 sampleUv = vUv;
              if (!gl_FrontFacing) sampleUv.x = 1.0 - sampleUv.x;
              sampleUv = sampleUv * uUvScale + uUvOffset;
              vec4 color = texture2D(uMap, sampleUv);
              if (color.a * uOpacity < 0.01) discard;
              gl_FragColor = vec4(color.rgb, color.a * uOpacity);
            }
          `,
          side: THREE.DoubleSide,
          transparent: true,
          depthTest: true,
          depthWrite: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;
        ribbonGroup?.add(mesh);
        return { geometry, material, mesh, restY, hoverScale: 1 };
      });

      resize();
      const sectionRect = section.getBoundingClientRect();
      visible = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;
      requestRender();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", loseContext);
      canvas.removeEventListener("webglcontextrestored", restoreContext);
      window.removeEventListener("pageshow", resumeRendering);
      window.removeEventListener("focus", resumeRendering);
      document.removeEventListener("visibilitychange", resumeRendering);
      section.removeEventListener("pointermove", movePointer);
      section.removeEventListener("pointerleave", clearHover);
      window.removeEventListener("blur", clearHover);
      hoverPreference.removeEventListener("change", clearHover);
      motionPreference.removeEventListener("change", clearHover);
      if (frame) window.cancelAnimationFrame(frame);
      ribbonMeshes.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      loadedTextures.forEach((texture) => texture.dispose());
      renderer?.dispose();
    };
  }, []);

  return (
    <div className={styles.lab}>
      <header className={styles.intro}>
        <p>{isSpanish ? "Prototipo de movimiento · 03" : "Motion prototype · 03"}</p>
        <h1>{isSpanish ? "El scroll convierte sistemas en una historia." : "Scroll turns systems into a story."}</h1>
        <div className={styles.introFooter}>
          <span>{isSpanish ? "Desplázate para controlar la secuencia" : "Scroll to control the sequence"}</span>
          <b aria-hidden="true">↓</b>
        </div>
      </header>

      <section ref={sectionRef} className={styles.sequence} aria-label={isSpanish ? "Estudio de movimiento de sistemas" : "Systems motion study"}>
        <div ref={stageRef} className={styles.stage}>
          <div className={`${styles.orbitLine} ${styles.orbitLinePrimary}`} aria-hidden="true" />
          <div className={`${styles.orbitLine} ${styles.orbitLineSecondary}`} aria-hidden="true" />

          <div className={styles.stageMeta}>
            <span>ABE MEDIA / MOTION STUDY</span>
            <span>{isSpanish ? "SCROLL REVERSIBLE" : "REVERSIBLE SCROLL"}</span>
          </div>
          <div className={styles.progress} aria-hidden="true"><i /></div>

          <div className={styles.words} aria-hidden="true">
            <span ref={firstWordRef}>{isSpanish ? "SISTEMAS" : "SYSTEMS"}</span>
            <span ref={secondWordRef}>{isSpanish ? "EN MOVIMIENTO" : "IN MOTION"}</span>
          </div>
          <p ref={supportRef} className={styles.support}>
            {isSpanish ? "Llamadas, handoffs, dispatch y prueba." : "Calls, handoffs, dispatch, and proof."}
          </p>

          <div className={styles.sideNote}>
            <span>{isSpanish ? "La operación completa" : "The full operation"}</span>
            <p>{isSpanish ? "Cada pantalla sigue el trabajo desde el primer contacto hasta el equipo en campo." : "Each screen follows the work from first contact to the field crew."}</p>
          </div>

          <div className={styles.ribbonScene} aria-label={isSpanish ? "Ejemplos de sistemas de Abe Media" : "Abe Media system examples"}>
            <canvas ref={canvasRef} className={styles.ribbonCanvas} aria-hidden="true" />
            <ul className={styles.screenReaderOnly}>
              {panels.map((panel) => <li key={panel.src}>{isSpanish ? panel.label.es : panel.label.en}</li>)}
            </ul>
            {reducedMotion ? (
              <div className={styles.reducedGallery}>
                {panels.map((panel, index) => (
                  <figure key={panel.src} className={styles.reducedCard}>
                    <Image
                      src={panel.src}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 88vw, 34vw"
                      style={{ objectPosition: panel.position }}
                    />
                    <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{isSpanish ? panel.label.es : panel.label.en}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <footer className={styles.outro}>
        <p>{isSpanish ? "La dirección siempre responde al usuario." : "Direction always answers to the user."}</p>
        <h2>{isSpanish ? "Sube. Baja. Todo se revierte." : "Down. Up. Every move reverses."}</h2>
      </footer>
    </div>
  );
}
