'use client'
import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BiCamera } from 'react-icons/bi';

export function ProfileCardImage({ profile }: ProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
const [data, setProfile] = useState<ProfileProps>(profile)
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

  const fileExt = file.name.split('.').pop();
  const fileName = `avatar.${fileExt}`; // consistent filename in user's folder
  const filePath = `${profile.id}/${fileName}`; // stores inside folder named by user.id
      console.log('ProfileCardImage: handleUpload: filePath, : ',filePath);

    const { error: uploadError } = await supabase.storage
      .from('user-images')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert('Upload failed!');
      console.error('ProfileCardImage: handleUpload: upload to bucket error: ',uploadError);
      return;
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
  .from('user-images')
  .createSignedUrl(filePath, 60 * 60 * 24 * 7); // valid for 7 days

if (signedUrlError) {
  console.error('ProfileCardImage: handleFileUpload: signedUrlError: ', signedUrlError);
  return;
}

const avatarUrl = signedUrlData.signedUrl;

    const { error: dbError } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', profile.id);

    if (dbError) {
      alert('Failed to update profile!');
      console.error(dbError);
      return;
    }

    alert('Profile image updated!');
    setProfile((prev: any) => ({ ...prev, avatar_url: avatarUrl }));
  };

  return (
    <div className={`absolute rounded-md overflow-hidden border-2 border-black top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
      <div className="relative group">
        <img
          src={data.avatar_url}
          className="h-[175px] w-[175px] sm:h-[250px] sm:w-[250px] hover:bg-black/50"
          alt={`${data.full_name}-img`}
          onClick={handleAvatarClick}
        />
        <button
          className="absolute inset-0 cursor-pointer bg-black/50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleAvatarClick}
        >
          <BiCamera className="w-6 h-6 text-white" />
        </button>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
    </div>
  );
}
