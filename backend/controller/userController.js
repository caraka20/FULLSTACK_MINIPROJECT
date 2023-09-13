const db = require("../models");
const { sequelize } = require("../models");
const { createJWT } = require("./../lib/jwt");
const transporter = require("./../helper/transporter");
const handlebars = require("handlebars");
const fs = require("fs").promises;
// const cetak_tiket = require("../models/cetak_tiket");

module.exports = {
  register: async (req, res, next) => {
    try {
      // console.log(fs);
      const { nama_lengkap, email, password } = req.body;
      console.log(nama_lengkap, email, password);
      const findUser = await db.user.findOne({ where: { email } });
      // validasi tidak boleh ada angka atau simbol di nama lengkap

      // harus dalam format email
      if (!email.includes("@") || !email.includes(".")) {
        throw { status: 409, message: "Format Email Salah" };
      }

      // validasi jika sudah ada email di database
      if (findUser) {
        return res.status(400).send({
          message: "email sudah terdaftar, silahkan menggunakan email lain",
        });
      }
      // password harus ada huruf besar, kecil dan spesial karakter, @!.
      const kecil = " abcdefghijklmnopqrstuvwxyz";
      const besar = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const simbol = `/^[!@#$%^&*()_+-=[]{}|;:'",.<>?/]+$/;`;
      const number = "1234567890";
      // const simbol = `/^[a-zA-Z0-9!@#$%^&*()_+-=[]{}|;:'",.<>?/]+$/;`;
      if (!besar.includes(password[0])) {
        throw {
          status: 400,
          message: "Password Harus Diawalai Dengan Huruf Besar",
        };
      }

      // nama tidak boleh ada angka dan simbol
      const cekNumberNama = number.split("").find((bebas) => {
        return nama_lengkap.split("").find((value) => {
          return bebas == value;
        });
      });
      if (cekNumberNama) {
        throw {
          status: 409,
          message: "Nama Tidak Boleh Ada Angka",
        };
      }
      // console.log(cekNumberNama);

      const cekNumber = number.split("").find((bebas) => {
        return password.split("").find((value) => {
          return bebas == value;
        });
      });

      // console.log(cekNumber);
      if (cekNumber === undefined) {
        throw {
          status: 409,
          message: "Pasword Harus Memiliki Angka",
        };
      }

      // Pasword Harus Memiliki Minimal 1 Huruf Kecil
      const cekHurufKecil = kecil.split("").filter((kecil) => {
        return password.split("").find((nama) => {
          return nama == kecil;
        });
      });
      if (cekHurufKecil.length === 0) {
        throw {
          status: 409,
          message: "Pasword Harus Memiliki Minimal 1 Huruf Kecil",
        };
      }

      // harus ada spesial karakter
      const cekSimbol = simbol.split("").filter((simbol) => {
        return password.split("").find((password) => {
          return password == simbol;
        });
      });
      if (cekSimbol.length === 0) {
        throw {
          status: 409,
          message: "Pasword Harus Memiliki Minimal 1 Simbol",
        };
      }

      // pasword minimal 6 karakter
      if (password.length < 6) {
        throw {
          status: 400,
          message: "password minimal 6 huruf",
        };
      }

      const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      const createUser = await db.user.create({
        nama_lengkap,
        email,
        password,
        saldo: 100000,
        point: 0,
        status: "Not verified",
        code: code,
      });

      const tkn = await createJWT({ id: createUser.dataValues.id }, "6h");
      const tkn1 = await createJWT({ id: createUser.dataValues.id }, "365d");

      const readTemplate = await fs.readFile("./public/template.html", "utf-8");
      const compiledTemplate = await handlebars.compile(readTemplate);
      const newTemplateEmail = compiledTemplate({
        email,
        tkn1,
        nama_lengkap,
        code,
      });

      console.log(code);
      console.log(tkn1);

      await transporter.sendMail({
        from: "paa ajah",
        to: email,
        subject: "Regisster Success",
        html: newTemplateEmail,
      });

      // const readTemplate = await fs.readFile('./public/')

      res.status(200).send({
        isError: false,
        message: "berhasil mendaftar, Cek Email!",
        data: createUser,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.query;
      const findUser = await db.user.findOne({ where: { email } });

      if (!findUser) {
        throw { status: 409, message: "Email Tidak Ditemukan" };
      }

      if (findUser.password !== password) {
        throw { status: 409, message: "Pasword Yang Anda Masukan Salah" };
      }

      if (findUser.status != "OK") {
        throw {status : 409, message : "Harus Konfirmasi Akun Dulu, Cek Email!!!"}
      }

      res.status(200).send({
        isError: false,
        message: "Anda Berhasil Login",
        data: findUser,
      });
    } catch (error) {
      next(error);
    }
  },

  dashboard: async (req, res) => {
    try {
      const { id } = req.params;
      const dataUser = await db.user.findByPk(Number(id));
      // const eventDibuat = await db.event.findAll({where : {user_id : Number(id)}})
      // {where : {userId : Number(id) }}
      const eventDiikuti = await db.cetak_tiket.findAll({
        attributes: [
          "id",
          "kode_referal",
          "user_id",
          "event_id",
          [sequelize.col("nama_lengkap"), "nama"],
          [sequelize.col("nama_event"), "nama_event"],
          [sequelize.col("time"), "time"],
          [sequelize.col("date"), "date"],
          [sequelize.col("detail_lokasi"), "detail_lokasi"],
          [sequelize.col("jenis_event"), "jenis_event"],
          [sequelize.col("nama_kota"), "nama_kota"],
        ],
        include: [
          {
            model: db.user,
            attributes: [],
          },
          {
            model: db.event,
            attributes: [],
            include: {
              model: db.kota,
              attributes: [],
            },
          },
        ],
        where: { user_id: Number(id) },
      });

      const eventDibuat = await db.event.findAll({
        attributes: [
          "id",
          "nama_event",
          "date",
          "time",
          "detail_lokasi",
          "jenis_event",
          "biaya",
          "image_link",
          "max_peserta",
          "deskripsi_singkat",
          "deskripsi_detail",
          "discount",
          "user_id",
          [sequelize.col("nama_kota"), "nama_kota"],
          [sequelize.col("nama_kategori"), "kategori"], // dimana as gaboleh sama kayak nama table
          [sequelize.col("nama_lengkap"), "pembuat_event"],
          // [sequelize.fn("COUNT",sequelize.col("kode_referal")), "total_event"]
        ],
        include: [
          {
            model: db.kota,
            attributes: [],
          },
          {
            model: db.kategori_event,
            attributes: [],
          },
          {
            model: db.user,
            attributes: [],
          },
          {
            model: db.cetak_tiket,
            attributes: [],
            // where : {user_id : id}
          },
        ],
        where: { user_id: id },
      });

      const dataEventDibuat = await db.event.findAll({
        attributes: [
          "id",
          "nama_event",
          "max_peserta",
          [sequelize.fn("COUNT", sequelize.col("kode_referal")), "terjual"],
        ],
        include: [
          {
            model: db.cetak_tiket,
            attributes: [],
          },
        ],
        where: { user_id: id },
        group: ["event.id"],
      });
      // res.send(dataEventDibuat)

      const dataComment = await db.comment.findAll();
      // console.log(dataComment)

      res.send({
        eventDiikuti,
        dataEventDibuat,
        dataUser,
        dataComment,
      });
    } catch (error) {
      res.send(error);
    }
  },

  editStatus: async (req, res, next) => {
    try {
      const { id } = req.dataToken;
      console.log(req.dataToken);
      const { code } = req.body;

      const getDataStatus = await db.user.findOne({
        where: { id: id, code: code },
      });
      // console.log(getDataStatus);
      if (getDataStatus === null) {
        throw { message: "Code Salah" };
      }

      await db.user.update(
        {
          ...getDataStatus,
          status: "OK",
        },
        {
          where: { id: id },
        }
      );

      res.status(200).send({
        isError: false,
        message: "Berhasil",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};

/*
  Ambil data user yang ditargetkan dimana id:id dan code:code
*/
