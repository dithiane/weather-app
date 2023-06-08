const { WEATHER_URL } = process.env
const history = []
projectData = {}
module.exports = {
    /**
     * Returns all the history records
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    getAll: (_, res) => {
        res.status(200).json({
            success: true,
            result: history
        })
    },
    /**
     * Adds a new entry to the journal and limits the total number of entries to 10.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Object} req.body - The request body containing the entry details.
     * @param {string} req.body.date - The date of the entry.
     * @param {string} req.body.temp - The temperature of the entry.
     * @param {string} req.body.feel - The feeling of the entry.
     * @param {string} req.body.location - The location of the entry.
     * @param {string} req.body.desc - The description of the entry.
     * @param {string} req.body.icon - The icon of the entry.
     * @returns {Object} The response object containing the success status and the updated history.
     */
    addToJournal: (req, res) => {
        const { date, temp, feel, location, desc, icon } = req.body;
        projectData = {
            date,
            temp,
            feel,
            location,
            desc,
            icon
        }
        history.push(projectData)
        if (history.length > 10) {
            history.splice(0, history.length - 10)
        }
        res.status(200).json({
            success: true,
            result: history
        })
    }
}