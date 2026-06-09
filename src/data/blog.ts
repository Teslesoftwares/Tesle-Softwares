import type { BlogArticle, BlogAuthor } from '@/types';
import data from './blog.json';

export const blogAuthors: BlogAuthor[] = data.authors as BlogAuthor[];
export const blogArticles: BlogArticle[] = data.articles as BlogArticle[];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return blogAuthors.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): BlogArticle[] {
  return blogArticles.filter((a) => a.featured);
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  return blogArticles.filter((a) => a.category === category);
}

export function getArticleCategories(): string[] {
  return [...new Set(blogArticles.map((a) => a.category))];
}

export function getRelatedArticles(article: BlogArticle, limit = 3): BlogArticle[] {
  return blogArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, limit);
}

export function getAuthorArticles(authorSlug: string): BlogArticle[] {
  return blogArticles.filter((a) => a.authorSlug === authorSlug);
}
