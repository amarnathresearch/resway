// Your existing JavaScript code

// Function to recursively build the HTML structure
function buildHtml(parentId, data) {
    let html = "";
    const folders = data.filter(item => item.parent_id === parentId && item.is_folder);
    const files = data.filter(item => item.parent_id === parentId && !item.is_folder);

    // Sort folders and files by name in ascending order
    folders.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    folders.forEach(folder => {
        html += `<li><li data-type="folder" class="highlight" data-id="${folder.id}" id="f-${folder.id}"><i class="bi bi-chevron-down"></i>${folder.name}</li>`;
        const nestedHtml = buildHtml(folder.id, data); // Recursively build the nested structure
        if (nestedHtml) {
            html += "<ul>"; // Start a new nested list
            html += nestedHtml;
            html += "</ul>"; // Close the nested list
        }
        html += "</li>";
    });

    files.forEach(file => {
        html += `<li data-type="file" class="highlight" data-id="${file.id}" id="f-${file.id}"><i class="bi bi-file-code"></i>${file.name}</li>`;
    });

    return html;
}

function buildFolderStructure(data) {
    let html = "<ul>";
    html += buildHtml(null, data); // Start building from the root
    html += "</ul>";
    return html;
}

function highlightMenuItem(item) {
    // Remove highlight from previously highlighted items
    const highlightedItems = document.querySelectorAll('.highlighted');
    highlightedItems.forEach(element => {
        element.classList.remove('highlighted');
    });

    // Highlight the clicked item
    item.classList.add('highlighted');
}

// Event listener to handle right-click on folder items
document.getElementById('folderStructure').addEventListener('contextmenu', function(event) {
    const target = event.target;
    if (target.nodeName === 'LI') {
        event.preventDefault();
        if (target.closest('#folderStructure')) {
            if (target.dataset.type === 'folder') {
                showFolderContextMenu(event, target.textContent, target.dataset.id, target.getBoundingClientRect());
            } else {
                showFileContextMenu(event, target.textContent, target.dataset.id, target.getBoundingClientRect());
            }
        }
    }
});

// Event listener to handle left-click on folder items
document.getElementById('folderStructure').addEventListener('click', function(event) {
    const target = event.target;
    if (target.nodeName === 'LI') {
        if (target.closest('#folderStructure')) {
            const itemId = target.dataset.id;
            highlightMenuItem(target);
            fileFolderClick(itemId);
            // Call your function passing the item ID
            yourFunction(itemId);
        }
    }
});

// Event listener to hide context menus when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.context-menu')) {
        hideAllContextMenus();
    }
});

// Function to hide all context menus
function hideAllContextMenus() {
    const contextMenus = document.querySelectorAll('.context-menu');
    contextMenus.forEach(menu => {
        menu.style.display = 'none';
    });
}

// Your existing JavaScript code

// Function to show folder context menu
function showFolderContextMenu(event, folderName, itemId, boundingRect) {
    event.preventDefault();
    hideAllContextMenus();
    const folderContextMenu = document.getElementById('folderContextMenu');
    folderContextMenu.style.left = event.pageX + 'px'; // Adjusted to align with right side
    folderContextMenu.style.top = event.pageY - 50 + 'px';
    // console.log(boundingRect);
    folderContextMenu.style.display = 'block';

    // Show only folder options
    document.querySelectorAll('.folder-option').forEach(item => item.style.display = 'block');
    document.querySelectorAll('.file-option').forEach(item => item.style.display = 'none');
    highlightMenuItem(event.target);
    folderContextMenu.setAttribute('data-item-id', itemId);

}

// Function to show file context menu
function showFileContextMenu(event, fileName, itemId, boundingRect) {
    event.preventDefault();
    hideAllContextMenus();
    const fileContextMenu = document.getElementById('fileContextMenu');
    fileContextMenu.style.left = event.pageX + 'px'; // Adjusted to align with right side
    fileContextMenu.style.top = event.pageY - 50 + 'px';
    fileContextMenu.style.display = 'block';

    // Show only file options
    document.querySelectorAll('.file-option').forEach(item => item.style.display = 'block');
    document.querySelectorAll('.folder-option').forEach(item => item.style.display = 'none');
    highlightMenuItem(event.target);
    fileContextMenu.setAttribute('data-item-id', itemId);
}