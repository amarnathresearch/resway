
    const container = document.querySelector('.draggable-container');

    function createButton(buttonText) {
        const button = document.createElement('div');
        button.classList.add('draggable-button');
        button.draggable = true;
        button.innerHTML = `${buttonText}<span class="close-button">×</span>`;
        container.appendChild(button);

        // Get the close button within this specific button
        const closeButton = button.querySelector('.close-button');

        // Create a closure around the removeButton function to capture the specific closeButton
        closeButton.addEventListener('click', function() {
            removeButton(closeButton);
        });
    }

    createButton('Button 1');
    createButton('Button 2');
    createButton('Button 3');

    const draggableButtons = document.querySelectorAll('.draggable-button');

    draggableButtons.forEach(button => {
        button.addEventListener('dragstart', dragStart);
        button.addEventListener('dragover', dragOver);
        button.addEventListener('dragenter', dragEnter);
        button.addEventListener('dragleave', dragLeave);
        button.addEventListener('drop', drop);
        button.addEventListener('dragend', dragEnd);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.innerHTML);
        event.target.classList.add('dragging');
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
        event.target.classList.add('dragover');
    }

    function dragLeave(event) {
        event.target.classList.remove('dragover');
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggedButton = document.querySelector('.dragging');

        if (draggedButton !== event.target) {
            // Determine the position of the dragged button and the drop target
            const draggedIndex = Array.from(container.children).indexOf(draggedButton);
            const dropIndex = Array.from(container.children).indexOf(event.target.closest('.draggable-button'));

            // Swap button positions
            if (draggedIndex < dropIndex) {
                container.insertBefore(draggedButton, event.target.closest('.draggable-button').nextSibling);
            } else {
                container.insertBefore(draggedButton, event.target.closest('.draggable-button'));
            }
        }

        event.target.classList.remove('dragover');
        draggableButtons.forEach(button => button.classList.remove('dragging'));
    }

    function dragEnd(event) {
        event.target.classList.remove('dragging');
    }

    function removeButton(closeButton) {
        const button = closeButton.parentElement;
        button.remove();
    }