I've converted the chatbot from a full-page application into an embeddable chat widget. This is the most common and user-friendly way to add a chatbot to an existing site.

It now works like this:
Floating Bubble: A small, circular chat icon will float in the bottom-right corner of your website, inviting users to interact without being intrusive.

Popup Window: When a user clicks the bubble, the chat window smoothly appears right there on the page. They can start chatting immediately.
Easy Integration: You can add this to your website by simply placing the built application's files on your server and adding a single script tag to your HTML—just like you would for Google Analytics or any other third-party script.

For your live website, you don't want every customer to upload your company's SOP. Instead, the documents should be pre-loaded and managed by you.
To simulate this, I have removed the file uploader from the interface. I've embedded a sample "SOP" directly into the code. In a real-world production setup, you would use Google's File API to securely upload and store your documents once. The chatbot would then be configured to automatically use those files as its knowledge base for every conversation, ensuring all users get consistent answers from your official documents.
