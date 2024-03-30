const editor = document.querySelector('.editor');
const preview = document.querySelector('.preview');

editor.addEventListener('input', () => {
  preview.textContent = marked(editor.value);
});

function marked(text) {
  return text.replace(/#+ (.+)/g, '<h1>$1</h1>');
}