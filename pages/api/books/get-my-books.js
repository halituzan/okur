const handler = async (req, res) => {

    try {
        res.status(200).json({ message: "Giriş Başarılı", status: true });
    } catch (error) {

    }
}

export default handler