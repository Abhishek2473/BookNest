import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Discover Your Next Read</h1>
          <p className="text-lg sm:text-xl lg:text-2xl">Explore, review, and connect with fellow book lovers.</p>
        </div>
      </div>

      {/* Purpose Section */}
      <section className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Purpose</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At BookHub, we believe in the transformative power of literature. Our purpose is to provide a platform where book enthusiasts can discover new reads, share their thoughts through reviews, and build a vibrant community of readers.
          </p>
        </div>
      </section>

      {/* Functionality Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Functionality</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              BookHub offers a seamless experience to manage your reading list, discover new books based on your interests, and engage with detailed book reviews and recommendations from our community.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
   

      {/* Reviews Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Reviews and Recommendations</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Discover insightful book reviews, curated recommendations, and ratings from our diverse community of readers. Whether you're looking for a thrilling adventure or a heartfelt story, find it here at BookHub.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
