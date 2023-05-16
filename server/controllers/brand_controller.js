const { brand, car } = require("../models");

class BrandController {
  static async getBrand(req, res) {
    try {
      let result = await brand.findAll({ include: [car] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addBrand(req, res) {
    try {
      const { brandName } = req.body;

      let brandImage = "";
      typeof req.file == "undefined"
        ? (brandImage = "https://via.placeholder.com/150")
        : (brandImage = req.file.path);

      let result = await brand.create({
        brandName,
        brandImage,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateBrand(req, res) {
    try {
      const id = +req.params.id;
      const { brandName } = req.body;

      const resultBrand = await brand.findByPk(id);

      let brandImage = "";

      if (resultBrand.brandImage == "https://via.placeholder.com/150") {
        if (typeof req.file == "undefined") {
          brandImage = "https://via.placeholder.com/150";
        } else {
          brandImage = req.file.path;
        }
      } else {
        if (typeof req.file == "undefined") {
          brandImage = resultBrand.image;
        } else {
          brandImage = req.file.path;
        }
      }
      let result = await brand.update(
        {
          brandName,
          brandImage,
        },
        {
          where: { id },
        }
      );
      result == 1
        ? res
            .status(200)
            .json({ message: `Rent House dengan id ${id} berhasil diupdate` })
        : res
            .status(404)
            .json({ message: `Rent House dengan id ${id} gagal diupdate` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = BrandController;
