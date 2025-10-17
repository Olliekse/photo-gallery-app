import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { ConfigType } from '@uploadcare/file-uploader';
import { useCallback, useEffect, useState } from 'react';
import { sign } from 'lib/client/api/Photos';

// Uploadcare React Uploader does not support SSR; load it dynamically on client only
type UploadcareUploaderProps = Partial<Omit<ConfigType, 'pubkey'>> & {
  pubkey: string;
  multiple?: boolean;
  onUploadComplete?: (file: unknown) => void;
};

const Uploader = dynamic<UploadcareUploaderProps>(
  () =>
    import('@uploadcare/react-uploader').then(
      (m) =>
        m.FileUploaderRegular as unknown as ComponentType<UploadcareUploaderProps>
    ),
  { ssr: false }
);

interface PhotoUploaderProps {
  onUploadComplete: (fileInfo: {
    cdnUrl: string;
    uuid: string;
    width?: number;
    height?: number;
  }) => void;
  multiple?: boolean;
}

export function PhotoUploader({
  onUploadComplete,
  multiple = false,
}: PhotoUploaderProps) {
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [secureSignature, setSecureSignature] = useState<string | null>(null);
  const [secureExpire, setSecureExpire] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { publicKey, signature, expire } = await sign();
        if (!mounted) return;
        setPubkey(publicKey);
        setSecureSignature(signature);
        setSecureExpire(expire);
      } catch (e) {
        console.error('Failed to obtain Uploadcare signature', e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUploadComplete = useCallback(
    (file: unknown) => {
      const f = file as {
        cdnUrl?: string;
        uuid?: string;
        originalImageInfo?: { width?: number; height?: number };
      };
      // Uploadcare file info typically includes: cdnUrl, uuid and originalImageInfo
      const width = f?.originalImageInfo?.width;
      const height = f?.originalImageInfo?.height;
      onUploadComplete({
        cdnUrl: f?.cdnUrl as string,
        uuid: f?.uuid as string,
        width,
        height,
      });
    },
    [onUploadComplete]
  );

  if (!pubkey || !secureSignature || !secureExpire) return null;

  return (
    <Uploader
      pubkey={pubkey}
      multiple={multiple}
      onUploadComplete={handleUploadComplete}
    />
  );
}

export default PhotoUploader;
