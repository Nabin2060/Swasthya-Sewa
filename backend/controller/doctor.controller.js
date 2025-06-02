import doctorModel from "../models/doctor.Model.js";


const changeAvilability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        })
        res.json({ success: true, message: "Availablity Changed" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

export { changeAvilability };