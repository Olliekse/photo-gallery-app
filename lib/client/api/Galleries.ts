import { Gallery, Prisma } from '@prisma/client';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function all(): Promise<Gallery[]> {
  const response = await fetch('/api/galleries');
  const json = (await response.json()) as Gallery[];

  if (!response.ok) {
    throw json;
  }

  return json;
}

export async function get(id: number): Promise<Gallery> {
  const response = await fetch(`/api/galleries/${id}`);
  const json = (await response.json()) as Gallery;

  if (!response.ok) {
    throw json;
  }

  return json;
}

export async function update(
  id: number,
  gallery: Prisma.GalleryUpdateInput
): Promise<Gallery> {
  const response = await fetch(`/api/galleries/${id}/update`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(gallery),
  });

  const json = (await response.json()) as Gallery;

  if (!response.ok) {
    throw json;
  }

  return json;
}

export async function create(
  gallery: Prisma.GalleryCreateInput
): Promise<Gallery> {
  const response = await fetch(`/api/galleries/create`, {
    method: 'POST',
    body: JSON.stringify(gallery),
    headers,
  });

  const json = (await response.json()) as Gallery;

  if (!response.ok) {
    throw json;
  }

  return json;
}

export async function destroy(id: number): Promise<Gallery> {
  const response = await fetch(`/api/galleries/${id}/delete`, {
    method: 'DELETE',
    headers,
  });

  const json = (await response.json()) as Gallery;

  if (!response.ok) {
    throw json;
  }

  return json;
}
