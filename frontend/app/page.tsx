'use client';

/**
 * Home Page
 * Main landing page with placeholders for all features
 */

import { useEffect, useState } from 'react';
import api, { APIError } from '@/lib/api';

interface HealthStatus {
  status: string;
  database: string;
  message: string;
}

export default function Home() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test backend connection on load
    async function checkHealth() {
      try {
        const response = await api.health.check();
        setHealth(response);
        setError(null);
      } catch (err) {
        if (err instanceof APIError) {
          setError(`API Error: ${err.message}`);
        } else {
          setError('Failed to connect to backend');
        }
      } finally {
        setLoading(false);
      }
    }

    checkHealth();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Learning Assistant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Transform your learning with AI-powered tools
        </p>

        {/* Backend Health Status */}
        <div className="inline-block">
          {loading && (
            <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
              Connecting to backend...
            </div>
          )}
          {health && (
            <div className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
              ✓ Backend Connected | Database: {health.database}
            </div>
          )}
          {error && (
            <div className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
              ✗ {error}
            </div>
          )}
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Upload PDF */}
        <FeatureCard
          icon="📄"
          title="Upload PDF"
          description="Extract text from PDF documents for AI-powered learning"
          status="Coming Soon"
        />

        {/* YouTube URL */}
        <FeatureCard
          icon="📺"
          title="YouTube Videos"
          description="Learn from YouTube videos with transcript extraction"
          status="Coming Soon"
        />

        {/* Flashcards */}
        <FeatureCard
          icon="🎴"
          title="Flashcards"
          description="Auto-generate flashcards from your learning materials"
          status="Coming Soon"
        />

        {/* Quiz */}
        <FeatureCard
          icon="📝"
          title="Quiz"
          description="Test your knowledge with AI-generated quizzes"
          status="Coming Soon"
        />

        {/* Chat */}
        <FeatureCard
          icon="💬"
          title="Chat"
          description="Ask questions about your documents with AI assistant"
          status="Coming Soon"
        />

        {/* Study Analytics */}
        <FeatureCard
          icon="📊"
          title="Analytics"
          description="Track your learning progress and performance"
          status="Coming Soon"
        />
      </div>

      {/* Tech Stack Info */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Technology Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <TechBadge name="Next.js 14" />
          <TechBadge name="TypeScript" />
          <TechBadge name="TailwindCSS" />
          <TechBadge name="FastAPI" />
          <TechBadge name="PostgreSQL" />
          <TechBadge name="Supabase" />
          <TechBadge name="pgvector" />
        </div>
      </div>
    </div>
  );
}

/**
 * Feature Card Component
 */
function FeatureCard({
  icon,
  title,
  description,
  status,
}: {
  icon: string;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
        {status}
      </span>
    </div>
  );
}

/**
 * Tech Badge Component
 */
function TechBadge({ name }: { name: string }) {
  return (
    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium">
      {name}
    </span>
  );
}
