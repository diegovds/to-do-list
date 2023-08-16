type FormHeaderProps = {
  title: string;
  description: string;
};

const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl">{title}</h1>
      <p className="text-base text-gray-300">{description}</p>
    </>
  );
};

export default FormHeader;
