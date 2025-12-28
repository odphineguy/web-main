"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Mail, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

// Hispanic population percentages by city (based on US Census data)
const cityData: Record<string, { hispanicPercent: number; displayName: string }> = {
  // Arizona
  "phoenix": { hispanicPercent: 0.42, displayName: "Phoenix, AZ" },
  "tucson": { hispanicPercent: 0.44, displayName: "Tucson, AZ" },
  "mesa": { hispanicPercent: 0.30, displayName: "Mesa, AZ" },
  "scottsdale": { hispanicPercent: 0.12, displayName: "Scottsdale, AZ" },
  "tempe": { hispanicPercent: 0.24, displayName: "Tempe, AZ" },
  "chandler": { hispanicPercent: 0.23, displayName: "Chandler, AZ" },
  "glendale": { hispanicPercent: 0.40, displayName: "Glendale, AZ" },
  "gilbert": { hispanicPercent: 0.18, displayName: "Gilbert, AZ" },
  "peoria": { hispanicPercent: 0.20, displayName: "Peoria, AZ" },
  // California
  "los angeles": { hispanicPercent: 0.48, displayName: "Los Angeles, CA" },
  "san diego": { hispanicPercent: 0.30, displayName: "San Diego, CA" },
  "san jose": { hispanicPercent: 0.32, displayName: "San Jose, CA" },
  "fresno": { hispanicPercent: 0.50, displayName: "Fresno, CA" },
  "sacramento": { hispanicPercent: 0.29, displayName: "Sacramento, CA" },
  // Texas
  "houston": { hispanicPercent: 0.45, displayName: "Houston, TX" },
  "san antonio": { hispanicPercent: 0.64, displayName: "San Antonio, TX" },
  "dallas": { hispanicPercent: 0.42, displayName: "Dallas, TX" },
  "austin": { hispanicPercent: 0.33, displayName: "Austin, TX" },
  "el paso": { hispanicPercent: 0.82, displayName: "El Paso, TX" },
  // Florida
  "miami": { hispanicPercent: 0.72, displayName: "Miami, FL" },
  "orlando": { hispanicPercent: 0.32, displayName: "Orlando, FL" },
  "tampa": { hispanicPercent: 0.26, displayName: "Tampa, FL" },
  // Other major cities
  "denver": { hispanicPercent: 0.30, displayName: "Denver, CO" },
  "las vegas": { hispanicPercent: 0.33, displayName: "Las Vegas, NV" },
  "albuquerque": { hispanicPercent: 0.50, displayName: "Albuquerque, NM" },
  "chicago": { hispanicPercent: 0.29, displayName: "Chicago, IL" },
  "new york": { hispanicPercent: 0.29, displayName: "New York, NY" },
  // Default for unknown cities
  "other": { hispanicPercent: 0.19, displayName: "Other US City" }, // US national average
};

// Industry multipliers for online search likelihood
const industryMultipliers: Record<string, number> = {
  "restaurant": 0.8,
  "home-services": 0.7,
  "health-wellness": 0.6,
  "retail": 0.5,
  "professional": 0.4,
  "other": 0.5,
};

interface CalculatorResults {
  potentialNewCustomers: number;
  monthlyRevenueIncrease: number;
  yearlyRevenueIncrease: number;
  hispanicPercent: number;
  cityName: string;
}

type Step = "input" | "lead-capture" | "results";

export default function ROICalculator() {
  const t = useTranslations("Calculator");
  const locale = useLocale();

  // Form state
  const [industry, setIndustry] = useState("");
  const [customersPerMonth, setCustomersPerMonth] = useState("");
  const [revenuePerCustomer, setRevenuePerCustomer] = useState("");
  const [city, setCity] = useState("");

  // Lead capture state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  // UI state
  const [currentStep, setCurrentStep] = useState<Step>("input");
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!industry) newErrors.industry = t("errors.industry");
    if (!customersPerMonth || parseFloat(customersPerMonth) <= 0) {
      newErrors.customersPerMonth = t("errors.customers");
    }
    if (!revenuePerCustomer || parseFloat(revenuePerCustomer) <= 0) {
      newErrors.revenuePerCustomer = t("errors.revenue");
    }
    if (!city.trim()) newErrors.city = t("errors.city");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateROI = () => {
    if (!validateInputs()) return;

    const cityKey = city.toLowerCase().trim();
    const cityInfo = cityData[cityKey] || cityData["other"];
    const industryMultiplier = industryMultipliers[industry] || 0.5;

    const customers = parseFloat(customersPerMonth);
    const revenue = parseFloat(revenuePerCustomer);

    // Calculate potential new Spanish-speaking customers
    const potentialNewCustomers = customers * cityInfo.hispanicPercent * industryMultiplier;
    const monthlyRevenueIncrease = potentialNewCustomers * revenue;
    const yearlyRevenueIncrease = monthlyRevenueIncrease * 12;

    setResults({
      potentialNewCustomers: Math.round(potentialNewCustomers * 10) / 10,
      monthlyRevenueIncrease,
      yearlyRevenueIncrease,
      hispanicPercent: cityInfo.hispanicPercent * 100,
      cityName: cityInfo.displayName || city,
    });

    setCurrentStep("lead-capture");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send to your API/CRM
    // For now, we'll simulate a submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // You can integrate with your existing contact form API here
      // await fetch('/api/leads', { ... })

      setLeadCaptured(true);
      setCurrentStep("results");
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skipLeadCapture = () => {
    setCurrentStep("results");
  };

  const resetCalculator = () => {
    setCurrentStep("input");
    setResults(null);
    setLeadCaptured(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 1: Input Form */}
        {currentStep === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-px bg-gradient-to-b from-orange-500/30 to-orange-600/10"
          >
            <div className="rounded-2xl p-6 md:p-8 bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Calculator className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("title")}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t("subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Industry Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    {t("inputs.industry.label")}
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.industry
                        ? "border-red-500"
                        : "border-gray-300 dark:border-neutral-700"
                    } bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                  >
                    <option value="">{t("inputs.industry.placeholder")}</option>
                    <option value="restaurant">{t("inputs.industry.options.restaurant")}</option>
                    <option value="home-services">{t("inputs.industry.options.homeServices")}</option>
                    <option value="health-wellness">{t("inputs.industry.options.healthWellness")}</option>
                    <option value="retail">{t("inputs.industry.options.retail")}</option>
                    <option value="professional">{t("inputs.industry.options.professional")}</option>
                    <option value="other">{t("inputs.industry.options.other")}</option>
                  </select>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
                  )}
                </div>

                {/* Customers per Month */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    {t("inputs.customers.label")}
                  </label>
                  <input
                    type="number"
                    value={customersPerMonth}
                    onChange={(e) => setCustomersPerMonth(e.target.value)}
                    placeholder={t("inputs.customers.placeholder")}
                    min="1"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.customersPerMonth
                        ? "border-red-500"
                        : "border-gray-300 dark:border-neutral-700"
                    } bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                  />
                  {errors.customersPerMonth && (
                    <p className="mt-1 text-sm text-red-500">{errors.customersPerMonth}</p>
                  )}
                </div>

                {/* Revenue per Customer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    {t("inputs.revenue.label")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-neutral-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={revenuePerCustomer}
                      onChange={(e) => setRevenuePerCustomer(e.target.value)}
                      placeholder={t("inputs.revenue.placeholder")}
                      min="1"
                      className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                        errors.revenuePerCustomer
                          ? "border-red-500"
                          : "border-gray-300 dark:border-neutral-700"
                      } bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  {errors.revenuePerCustomer && (
                    <p className="mt-1 text-sm text-red-500">{errors.revenuePerCustomer}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    {t("inputs.city.label")}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.city
                        ? "border-red-500"
                        : "border-gray-300 dark:border-neutral-700"
                    } bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                  >
                    <option value="">{t("inputs.city.placeholder")}</option>
                    <optgroup label="Arizona">
                      <option value="phoenix">Phoenix, AZ</option>
                      <option value="tucson">Tucson, AZ</option>
                      <option value="mesa">Mesa, AZ</option>
                      <option value="scottsdale">Scottsdale, AZ</option>
                      <option value="tempe">Tempe, AZ</option>
                    </optgroup>
                    <optgroup label="California">
                      <option value="los angeles">Los Angeles, CA</option>
                      <option value="san diego">San Diego, CA</option>
                      <option value="san jose">San Jose, CA</option>
                      <option value="fresno">Fresno, CA</option>
                      <option value="sacramento">Sacramento, CA</option>
                    </optgroup>
                    <optgroup label="Texas">
                      <option value="houston">Houston, TX</option>
                      <option value="san antonio">San Antonio, TX</option>
                      <option value="dallas">Dallas, TX</option>
                      <option value="austin">Austin, TX</option>
                      <option value="el paso">El Paso, TX</option>
                    </optgroup>
                    <optgroup label="Florida">
                      <option value="miami">Miami, FL</option>
                      <option value="orlando">Orlando, FL</option>
                      <option value="tampa">Tampa, FL</option>
                    </optgroup>
                    <optgroup label="Other States">
                      <option value="denver">Denver, CO</option>
                      <option value="las vegas">Las Vegas, NV</option>
                      <option value="albuquerque">Albuquerque, NM</option>
                      <option value="chicago">Chicago, IL</option>
                      <option value="new york">New York, NY</option>
                    </optgroup>
                    <option value="other">{t("inputs.city.other")}</option>
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                    {t("inputs.city.hint")}
                  </p>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateROI}
                  className="w-full py-4 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2"
                >
                  {t("calculateButton")}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Lead Capture */}
        {currentStep === "lead-capture" && (
          <motion.div
            key="lead-capture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-px bg-gradient-to-b from-orange-500/30 to-orange-600/10"
          >
            <div className="rounded-2xl p-6 md:p-8 bg-white dark:bg-neutral-900">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-500/10 mb-4">
                  <Mail className="h-8 w-8 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("leadCapture.title")}
                </h2>
                <p className="text-gray-600 dark:text-neutral-400">
                  {t("leadCapture.subtitle")}
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("leadCapture.name")}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("leadCapture.email")}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("leadCapture.phone")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t("leadCapture.submitting")}
                    </>
                  ) : (
                    <>
                      {t("leadCapture.submit")}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={skipLeadCapture}
                  className="text-sm text-gray-500 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors underline underline-offset-2"
                >
                  {t("leadCapture.skip")}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {currentStep === "results" && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-px bg-gradient-to-b from-green-500/30 to-green-600/10"
          >
            <div className="rounded-2xl p-6 md:p-8 bg-white dark:bg-neutral-900">
              {leadCaptured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center"
                >
                  <p className="text-sm text-green-800 dark:text-green-300">
                    {t("results.emailSent")}
                  </p>
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("results.title")}
                </h2>
                <p className="text-gray-600 dark:text-neutral-400">
                  {t("results.basedOn", { city: results.cityName, percent: Math.round(results.hispanicPercent) })}
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-5 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-center"
                >
                  <p className="text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">
                    {t("results.newCustomers")}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    +{results.potentialNewCustomers} <span className="text-lg font-normal text-gray-500">/{t("results.month")}</span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-5 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-center"
                >
                  <p className="text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">
                    {t("results.monthlyRevenue")}
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    +{formatCurrency(results.monthlyRevenueIncrease)}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-center"
                >
                  <p className="text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">
                    {t("results.yearlyRevenue")}
                  </p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    +{formatCurrency(results.yearlyRevenueIncrease)}
                  </p>
                </motion.div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Link
                  href={`/${locale}/get-started`}
                  className="w-full py-4 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2"
                >
                  {t("results.cta")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button
                  onClick={resetCalculator}
                  className="w-full py-3 px-6 rounded-full font-medium text-gray-600 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  {t("results.recalculate")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
