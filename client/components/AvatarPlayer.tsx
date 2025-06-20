interface Props {
  videoUrl: string;
}

export default function AvatarPlayer({ videoUrl }: Props) {
  return (
    <div className="mt-4 border rounded overflow-hidden shadow-lg">
      <video src={videoUrl} controls className="w-full" />
    </div>
  );
}
