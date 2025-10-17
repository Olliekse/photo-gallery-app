type CreatePhotoPayload = {
  url: string;
  uploadcarePublicId: string;
  width: number;
  height: number;
  caption?: string | null;
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function sign() {
  const response = await fetch('/api/photos/sign', { method: 'POST' });
  const json = await response.json();
  if (!response.ok) throw json;
  return json as { publicKey: string; expire: number; signature: string };
}

export async function create(galleryId: number, payload: CreatePhotoPayload) {
  const response = await fetch(`/api/galleries/${galleryId}/photos/create`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  const json = await response.json();
  if (!response.ok) throw json;
  return json;
}

export async function destroy(photoId: number) {
  const response = await fetch(`/api/photos/${photoId}/delete`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    let json: unknown = {};
    try {
      json = await response.json();
    } catch {}
    throw json as Record<string, unknown>;
  }
  return { ok: true };
}
