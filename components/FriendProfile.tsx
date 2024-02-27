interface FriendProfileProps {
    name: string;
    onClick: () => void;
}

const FriendProfile: React.FC<FriendProfileProps> = ({ name,onClick }) => {
    return (
        <div className="border border-white h-[80px] w-[80px]" onClick={onClick}>
            {name}
        </div>
    );
};

export default FriendProfile;
