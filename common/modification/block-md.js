// block-md.js
console.log("Markdown file blocker loaded");

// Prevent editing, copy, and paste in .md files
function isMarkdownFile() {
    const activeTab = document.querySelector(".tab.active .label-name");
    const fileName = activeTab?.innerText || "";
    return fileName.toLowerCase().endsWith(".md");
}

// Block typing/input
document.addEventListener("keydown", (e) => {
    if (isMarkdownFile()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    }
}, true);

// Block copy
document.addEventListener("copy", async (e) => {
    if (isMarkdownFile()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        await navigator.clipboard.writeText("Copy blocked in Markdown files");
    }
}, true);

// Block paste
document.addEventListener("paste", async (e) => {
    if (isMarkdownFile()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        await navigator.clipboard.writeText("Paste blocked in Markdown files");
    }
}, true);

// Block drag/drop
document.addEventListener("drop", (e) => {
    if (isMarkdownFile()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.dataTransfer.clearData();
    }
}, true);