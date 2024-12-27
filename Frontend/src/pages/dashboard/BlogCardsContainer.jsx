import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const BlogCardsContainer = ({blogs , loading}) => {
 

  // Loader display while fetching data
  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div>
      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.slug}`} key={blog.slug}>
            <BlogCard
              title={blog.topic}
              content={blog.content || "No content available"}
              author={blog.content_method} 
              profile_image={blog.user.profile.profile_picture}
              date={new Date(blog.created_at).toLocaleDateString()} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCardsContainer;
