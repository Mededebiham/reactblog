const Tag = require('../models/Tag');

// Controller-Methoden
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTagById = async (req, res) => {
    const tagId = req.params.id;
    try {
        const tag = await Tag.findById(tagId);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTag = async (req, res) => {
    const { name, color } = req.body;
    try {
        const newTag = new Tag({ name, color });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTag = async (req, res) => {
    const tagId = req.params.id;
    const { name, color } = req.body;
    try {
        const updatedTag = await Tag.findByIdAndUpdate(
            tagId,
            { name, color },
            { new: true }
        );
        if (!updatedTag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json(updatedTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAllTags = async (req, res) => {
    try {
        await Tag.deleteMany({});
        res.json({ message: 'All tags deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTagById = async (req, res) => {
    const tagId = req.params.id;
    try {
        const deletedTag = await Tag.findByIdAndDelete(tagId);
        if (!deletedTag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
