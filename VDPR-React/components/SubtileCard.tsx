interface SubtileProps {
  title: string;
  description: string;
}

function SubtileCard({ title, description }: SubtileProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default SubtileCard;