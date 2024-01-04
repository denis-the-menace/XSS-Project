document.addEventListener("DOMContentLoaded", function () {
  const displayData = document.getElementById("posts");

  fetch("/posts")
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("posts-container__post-container");

        const postTitle = document.createElement("h1");
        postTitle.innerHTML = post.title;

        const postContent = document.createElement("p");
        postContent.innerHTML = post.content;

        postContainer.appendChild(postTitle);
        postContainer.appendChild(postContent);

        displayData.appendChild(postContainer);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});

function validateForm() {
  var title = document.getElementById("post-title").value;
  var content = document.getElementById("post-content").value;

  if (title === "" || content === "") {
    alert("Please fill in both title and content fields.");
    return false;
  }
  return true;
}
