interface CourseInfoProps {
    title: string;
    value: string;
  }
  
  export function CourseInfo({ title, value }: CourseInfoProps) {
    return (
      <div className="space-y-2">
        <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
          {title}
        </div>
        <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
          {value}
        </div>
      </div>
    );
  }