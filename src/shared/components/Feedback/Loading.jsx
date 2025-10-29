export const Loading = ({ message = "Cargando..." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#198bad] mb-4"></div>
            <p className="text-gray-500 text-center">{message}</p>
        </div>
    );
};

export default Loading


