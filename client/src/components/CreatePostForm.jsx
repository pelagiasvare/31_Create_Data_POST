// Project 31: CreatePostForm — POST /api/posts with validation + error handling
import { useState } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';
import Card from './Card.jsx';
import { validateRequired, validateLength } from '../utils/validation.js';

export default function CreatePostForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {
      title: validateRequired(title, 'Title') || validateLength(title, 3, 100),
      content: validateRequired(content, 'Content') || validateLength(content, 10),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setSubmitting(true);
    try {
      await onCreate({ title, content });
      setTitle(''); setContent('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Create a post</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
        </div>
        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Create post'}</Button>
      </form>
    </Card>
  );
}