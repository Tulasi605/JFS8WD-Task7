document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 10;
    let items = [];
    let currentPage = 1;
    const contentElement = document.getElementById('content');
    const paginationElement = document.getElementById('pagination');

    // Fetch the JSON data
    fetch('./pagination.json')
        .then(response => response.json())
        .then(data => {
            items = data;
            const totalPages = Math.ceil(items.length / itemsPerPage);
            renderItems(currentPage);
            renderPagination(totalPages);
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderItems(page) {
        contentElement.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);

        pageItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = item.id+'. '+item.name+', '+item.email;
            contentElement.appendChild(itemElement);
        });
    }

    function renderPagination(totalPages) {
        paginationElement.innerHTML = '';

        // First page button
        const firstPageElement = document.createElement('li');
        firstPageElement.textContent = 'First';
        firstPageElement.addEventListener('click', () => {
            currentPage = 1;
            renderItems(currentPage);
            renderPagination(totalPages);
        });
        paginationElement.appendChild(firstPageElement);

        // Previous button
        const prevPageElement = document.createElement('li');
        prevPageElement.textContent = 'Previous';
        prevPageElement.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderItems(currentPage);
                renderPagination(totalPages);
            }
        });
        paginationElement.appendChild(prevPageElement);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageElement = document.createElement('li');
            pageElement.textContent = i;
            pageElement.className = i === currentPage ? 'active' : '';
            pageElement.addEventListener('click', () => {
                currentPage = i;
                renderItems(currentPage);
                renderPagination(totalPages);
            });
            paginationElement.appendChild(pageElement);
        }

        // Last page button
        const lastPageElement = document.createElement('li');
        lastPageElement.textContent = 'Last';
        lastPageElement.addEventListener('click', () => {
            currentPage = totalPages;
            renderItems(currentPage);
            renderPagination(totalPages);
        });
        paginationElement.appendChild(lastPageElement);
    }
});
