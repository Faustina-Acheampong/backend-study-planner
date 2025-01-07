import Button from '@/components/shared/Button';

interface CourseHeaderProps {
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export function CourseHeader({ onEdit, onArchive, onDelete }: CourseHeaderProps) {
  return (
    <div className="bg-greyDark h-60 w-full relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button onClick={onEdit} type="fill" label="Edit" />
        <Button onClick={onArchive} type="outline" label="Archive" />
        <Button onClick={onDelete} type="danger" label="Delete" />
      </div>
    </div>
  );
}