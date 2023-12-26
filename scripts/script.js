document.addEventListener('DOMContentLoaded', function() {
  const displayData = document.getElementById('displayData');

  // Fetch posts from the server
  fetch('/api/posts')
    .then(response => response.json())
    .then(posts => {
      // Loop through the fetched posts and create list items
      posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML= post.title; // Set the text content
        displayData.appendChild(listItem); // Append the list item to the ul
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
});
