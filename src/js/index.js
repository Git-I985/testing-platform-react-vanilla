const dropzone = document.querySelector('.complete-test-card');

const fileValid = (filename) => {
    const filenameParts = filename.split('.');
    return filenameParts.length === 2 && filenameParts.pop() === 'json';
};

const startTesting = (file) => {
    if (!fileValid(file.name)) return alert('Не корректный файл теста!');

    const reader = new FileReader();
    reader.onload = () => {
        window.data = reader.result;
        window.open('./pass.html');
    };
    reader.readAsText(file);
};

['dragenter', 'dragleave', 'dragover', 'drop'].forEach((event) =>
    dropzone.addEventListener(event, (e) => e.preventDefault())
);

dropzone.addEventListener('dragenter', (e) => {
    dropzone.classList.add('dashboard-card-hovered');
});

dropzone.addEventListener('dragover', (e) => {
    dropzone.classList.add('dashboard-card-hovered');
});

dropzone.addEventListener('dragleave', (e) => {
    dropzone.classList.remove('dashboard-card-hovered');
});

dropzone.addEventListener('drop', (e) => {
    dropzone.classList.remove('dashboard-card-hovered');
    startTesting(Array.from(e.dataTransfer.files).shift());
});

dropzone.addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input
        .addEventListener(
            'change',
            (e) => startTesting(Array.from(e.currentTarget.files).shift()), false
        );
    input.click();
});
