function untis() {
    const button = document.getElementById('untis_button');
    button.addEventListener('click', function () {
        let className = prompt("Klasse eingeben (Bsp.: 'Klasse5a')");
        window.location.href = `/untis?className=${className}`;
    });
}
untis()