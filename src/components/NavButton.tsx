function NavButton({ title, imgPath, fn }: {
    title: string,
    imgPath: string,
    fn: () => void
}) {
    return (
        <div title={title} onClick={fn}
            className="margin-top24 nav-icon">
            <img src={imgPath} />
        </div>
    );
}

export default NavButton;