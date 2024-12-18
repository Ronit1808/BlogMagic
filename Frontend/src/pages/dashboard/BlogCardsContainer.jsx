import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Modal from "./Modal";

const blogPosts = [
  {
    id: 1,
    title: "How to Write Engaging Content",
    content: "Tips and tricks to captivate your audience.",
    author: "John Doe",
    date: "Dec 10, 2024",
  },
  {
    id: 2,
    title: "AI in Blogging",
    content:
      "Exploring how AI transforms content creation. AI is the future of content writing. At its core, blogging is about building connections through words. Whether someone writes about technology, lifestyle, health, travel, or personal growth, their stories can inspire, educate, and entertain others. The power of blogs lies in their ability to spark change—whether that's helping someone learn a new skill, adopt a better habit, or see the world through a different lens. This power has only grown stronger with advancements in the digital world. Blogging platforms have made it easier than ever to start writing, while social media amplifies the reach of good stories. For creators, the key is to balance creativity with strategy, staying true to their voice while using modern tools to streamline the process. By combining purpose, passion, and consistency, blogs can leave a lasting impact in an ever-evolving digital landscape. ",
    author: "Jane Smith",
    date: "Dec 12, 2024",
  },
  {
    id: 2,
    title: "AI in Blogging",
    content:
      "Exploring how AI transforms content creation. AI is the future of content writing.",
    author: "Jane Smith",
    date: "Dec 12, 2024",
  },
  {
    id: 2,
    title: "AI in Blogging",
    content:
      "Exploring how AI transforms content creation. AI is the future of content writing.",
    author: "Jane Smith",
    date: "Dec 12, 2024",
  },
  // Add more blog posts here
];

const BlogCardsContainer = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    alert("Edit functionality coming soon!");
  };

  const handleDelete = () => {
    alert("Delete functionality coming soon!");
  };

  return (
    <div>
      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            date={blog.date}
            onClick={() => handleCardClick(blog)}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        blog={selectedBlog}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BlogCardsContainer;
