const boxes = document.querySelectorAll('.box');

const checkBoxes = () => {
    const trigger = (window.innerHeight / 5) * 4;
    console.log('работаем');
    for (const box of boxes) {
        const topOfBox = box.getBoundingClientRect().top;
        if (topOfBox < trigger) {
            console.log('добавляем');
            box.classList.add('show');
        } else {
            console.log('убираем');
            box.classList.remove('show');
        }
    }
};

checkBoxes();

window.addEventListener('scroll', checkBoxes);