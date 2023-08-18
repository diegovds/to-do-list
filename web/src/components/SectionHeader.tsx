type SectionHeaderProps = {
  title: string;
  description: string;
};

const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mb-3">{title}</h1>
      <p className="text-base text-gray-300">{description}</p>
    </div>
  );
};

export default SectionHeader;
