const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Tag.update(req.body, { where: id });

    if (updated) {
      const updatedTags = await Tag.findByPk(id);
      res.status(200).json(updatedTags);
    } else {
      res.status(404).json({ message: 'Tag not found' })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const destroyed = await Tag.destroy({ where: { id } });

    if (destroyed) {
      res.status(200).json({ message: 'Tag deleted' });
    } else {
      res.status(400).json({ message: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
