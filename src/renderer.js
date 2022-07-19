const { ipcRenderer } = require("electron");
const path = require("path")

window.addEventListener("DOMContentLoaded", () => {

  const lde = {
    createFileBtn: document.getElementById("createFileBtn"),
    documentName: document.getElementById("documentName"),
    fileTextArea: document.getElementById("fileTextArea"),
    openFileBtn: document.getElementById("openFileBtn"),
  };

  const handleFileChange = (filePath, content = "") => {
    lde.documentName.innerHTML = path.parse(filePath).base
    lde.fileTextArea.removeAttribute("disabled")
    lde.fileTextArea.value = content
    lde.fileTextArea.focus()
  }

  lde.createFileBtn.addEventListener("click", () => {
    ipcRenderer.send("create-file-clicked")
  })

  lde.openFileBtn.addEventListener("click", () => {
    ipcRenderer.send("open-file-clicked")
  })

  lde.fileTextArea.addEventListener("input", (e) => {
    ipcRenderer.send("file-updated", e.target.value)
  })

  ipcRenderer.on('document-opened', (_, { filePath, content }) => {
    handleFileChange(filePath, content)
  })

  ipcRenderer.on('file-created', (_, filePath) => {
    handleFileChange(filePath)
  })

})