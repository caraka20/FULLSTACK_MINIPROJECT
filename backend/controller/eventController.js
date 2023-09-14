const db = require("../models");
const { sequelize } = require("../models");

module.exports = {
  createEvent: async (req, res, next) => {
    try {
      const {
        nama_event,
        date,
        time,
        detail_lokasi,
        jenis_event,
        biaya,
        image_link,
        max_peserta,
        deskripsi_singkat,
        deskripsi_detail,
        discount,
        kota_id,
        kategori_event_id,
        user_id,
      } = req.body;

      if (
        !nama_event ||
        !date ||
        !time ||
        !detail_lokasi ||
        !jenis_event ||
        !image_link ||
        !max_peserta ||
        !deskripsi_singkat ||
        !deskripsi_detail
      ) {
        throw { message: "Data Tidak Lengkap backend" };
      }
      const findEvent = await db.event.findOne({ where: { nama_event } });
      if (findEvent) {
        throw {
          status: 409,
          message: "Nama Event Sudah Tersedia, Silahkan Ganti Nama Lain",
        };
      }

      const data = await db.event.create({
        nama_event,
        date,
        time,
        detail_lokasi,
        jenis_event,
        biaya: Number(biaya),
        image_link,
        max_peserta: Number(max_peserta),
        deskripsi_singkat,
        deskripsi_detail,
        discount: Number(discount),
        kota_id: Number(kota_id),
        kategori_event_id: Number(kategori_event_id),
        user_id: Number(user_id),
      });
      res.status(200).send({
        isError: false,
        message: "Event Berhasil Dibuat",
        data: data,
      });

      console.log(findEvent);
    } catch (error) {
      next(error);
    }
  },

  buyWithSaldo: async (req, res, next) => {
    const { event_id, user_id, kode_referal } = req.body;

    // 0. ambil data cetak tiket yg ada kode referalnya
    const dataReferal = await db.cetak_tiket.findOne({
      where: { kode_referal },
    });

    // 1. ambil data event
    const dataEvent = await db.event.findByPk(event_id);

    // 2. ambil data user / pembeli
    const dataUser = await db.user.findByPk(user_id);

    try {
      // 3. validasi saldo harus lebih dari biaya tiket
      if (dataUser.saldo < dataEvent.biaya) {
        throw {
          isError: true,
          message: "Maaf Saldo Tidak Mencukupi",
        };
      }

      // 4. validasi kalo event itu gaboleh dibeli oleh si pembuatnya
      if (dataEvent.user_id === user_id) {
        throw {
          isError: true,
          message: "Gaboleh Beli Event Sendiri Woi",
        };
      }

      // 5. validasi tidak bisa membeli ketika max pesertanya itu < 1 / tiket habis
      if (dataEvent.max_peserta < 1) {
        throw {
          isError: true,
          message: "Tiket Udah Habis",
        };
      }

      // kalo kode referalnya kosong masih bisa membeli
      if (!dataReferal) {
        function getRandomCode() {
          let result = "";
          for (let i = 0; i < 6; i++) {
            const randomDigit = Math.floor(Math.random() * 10);
            result += randomDigit;
          }
          return result;
        }
        // create cetak_tiket
        const dataCetakTiket = await db.cetak_tiket.create({
          kode_referal: getRandomCode(),
          user_id: user_id,
          event_id: event_id,
        });

        // ngurangin saldo user
        const editSaldo = await db.user.update(
          { saldo: dataUser.saldo - dataEvent.biaya },
          { where: { id: user_id } }
        );

        // ngurangin max peserta event
        const editMaxPeserta = await db.event.update(
          { max_peserta: dataEvent.max_peserta - 1 },
          { where: { id: event_id } }
        );

        res.status(200).send({
          isError: false,
          message: "Berhasil Membeli",
          data: dataCetakTiket,
        });
      }

      // kalo kode referalnya ada dan saldo cukup ada tiketnya, final pokoknya lah
      if (dataReferal) {
        function getRandomCode() {
          let result = "";
          for (let i = 0; i < 6; i++) {
            const randomDigit = Math.floor(Math.random() * 10);
            result += randomDigit;
          }
          return result;
        }
        // create cetak_tiket
        const dataCetakTiket = await db.cetak_tiket.create({
          kode_referal: getRandomCode(),
          user_id: user_id,
          event_id: event_id,
        });

        // ngurangin saldo user + nambah point
        const editSaldo = await db.user.update(
          {
            saldo:
              dataUser.saldo -
              (dataEvent.biaya - (dataEvent.biaya * dataEvent.discount) / 100),
            point: dataUser.point + 1,
          },
          { where: { id: user_id } }
        );

        // ngurangin max peserta event
        const editMaxPeserta = await db.event.update(
          { max_peserta: dataEvent.max_peserta - 1 },
          { where: { id: event_id } }
        );

        // ambil data si pemilik referal
        const pemilikReferral = await db.user.findByPk(dataReferal.user_id);

        // menambahkan point si pemilik kode referal
        const updatePointPemilik = await db.user.update(
          {
            point: (pemilikReferral.point += 1),
          },
          { where: { id: dataReferal.user_id } }
        );

        res.status(200).send({
          isError: false,
          message: "Berhasil Membeli",
          data: dataCetakTiket,
          // price:
        });
      }
    } catch (error) {
      next(error);
    }
  },

  buyWithPoint: async (req, res, next) => {
    const { user_id, event_id } = req.body;

    // 1. ambil data event
    const dataEvent = await db.event.findByPk(event_id);

    // 2. ambil data user / pembeli
    const dataUser = await db.user.findByPk(user_id);

    try {
      // 3. validasi point harus lebih dari 3
      if (dataUser.point < 3) {
        throw {
          isError: true,
          message: "Maaf Point Tidak Mencukupi",
        };
      }

      // 4. validasi kalo event itu gaboleh dibeli oleh si pembuatnya
      if (dataEvent.user_id === user_id) {
        throw {
          isError: true,
          message: "Gaboleh Beli Event Sendiri Woi",
        };
      }

      // 5. validasi tidak bisa membeli ketika max pesertanya itu < 1 / tiket habis
      if (dataEvent.max_peserta < 1) {
        throw {
          isError: true,
          message: "Tiket Udah Habis",
        };
      }

      // 7. berhasil beli dengan point
      function getRandomCode() {
        let result = "";
        for (let i = 0; i < 6; i++) {
          const randomDigit = Math.floor(Math.random() * 10);
          result += randomDigit;
        }
        return result;
      }
      // create cetak_tiket
      const dataCetakTiket = await db.cetak_tiket.create({
        kode_referal: getRandomCode(),
        user_id: user_id,
        event_id: event_id,
      });

      // ngurangin saldo user
      const editPoint = await db.user.update(
        { point: dataUser.point - 3 },
        { where: { id: user_id } }
      );

      // ngurangin max peserta event
      const editMaxPeserta = await db.event.update(
        { max_peserta: dataEvent.max_peserta - 1 },
        { where: { id: event_id } }
      );

      res.status(200).send({
        isError: false,
        message: "Berhasil Membeli dengan 3 Point",
        data: dataCetakTiket,
      });
    } catch (error) {
      next(error);
    }
  },

  applyReferal: async (req, res) => {
    const { idEvent, idUser, kode_referal } = req.query;

    console.log(idEvent, idUser, kode_referal);
    // 0. ambil data cetak tiket yg ada kode referalnya
    const dataReferal = await db.cetak_tiket.findOne({
      where: { kode_referal },
    });

    // 1. ambil data event
    const dataEvent = await db.event.findByPk(idEvent);

    // 2. ambil data user / pembeli
    const dataUser = await db.user.findByPk(idUser);

    // kalo kode referal nya tidak ada
    try {
      if (!dataReferal) {
        res.status(409).send({
          isError: true,
          message: "Kode Referal Tidak Sesuai",
        });
      }
    } catch (error) {
      res.status(409).send({
        isError: true,
        message: "error karena gada data referal yg sesuai",
      });
    }

    // 6. validasi kode referal yg dipakai harus pada event yg sama
    try {
      if (dataReferal && dataReferal.event_id != dataEvent.id) {
        return res.status(409).send({
          isError: true,
          message: "Kode Referal Harus Di Event Yang Sama",
        });
      }
    } catch (error) {
      res
        .status(409)
        .send(
          "error pada kode referal yg dipakai harus pada event yg sama",
          +error.message
        );
    }

    // 6.1. validasi tidak bisa pakai kode referal sendir
    try {
      if (dataReferal && dataReferal.dataValues.user_id == idUser) {
        return res.status(409).send({
          isError: true,
          message: "Gaboleh Pakai Kode Referal Sendiri Ya Bang",
        });
      }
    } catch (error) {
      return res
        .status(409)
        .send("tidak bisa pakai kode referal sendiri" + error.message);
    }

    // kode berhasil di aply
    try {
      const dataReferal = await db.cetak_tiket.findOne({
        where: { kode_referal },
      });
      if (dataReferal) {
        res.status(200).send({
          isError: false,
          message: "Kode Berhasil Di Aply",
        });
      }
    } catch (error) {
      res.status(409).send("ini salah saat aply", error.message);
    }
  },

  // filter : async (req, res) => {
  //     const {kota_id, kategori_event_id, jenis_event} = req.query
  //     console.log(req.query);
  //     const propertiFilter = {}
  //     if(kota_id) {propertiFilter.kota_id = Number(kota_id)}
  //     if(kategori_event_id) {propertiFilter.kategori_event_id = Number(kategori_event_id)}
  //     if(jenis_event) {propertiFilter.jenis_event = jenis_event}
  //     // console.log(propertiFilter);
  //     try {
  //        const dataFilter = await db.event.findAll({
  //         where : propertiFilter
  //        })
  //     //    console.log(kota_id, kategori_event_id, jenis_event);
  //        res.send(dataFilter)
  //     } catch (error) {
  //         res.status(409).send({
  //             isError : true,
  //             message : "ini error di bagian filter" + error.message
  //         })
  //     }
  // },

  getAllEvent: async (req, res) => {
    try {
      const { kota_id, kategori_event_id, jenis_event } = req.query;
      const propertiFilter = {};
      console.log(req.query);
      if (kota_id) {
        propertiFilter.kota_id = Number(kota_id);
      }
      if (kategori_event_id) {
        propertiFilter.kategori_event_id = Number(kategori_event_id);
      }
      if (jenis_event) {
        propertiFilter.jenis_event = jenis_event;
      }
      const data = await db.event.findAll({
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
          "kategori_event_id",
          "kota_id",
          "user_id",
          [sequelize.col("nama_kategori"), "kategori"],
          [sequelize.col("nama_kota"), "kota"],
          [sequelize.col("nama_lengkap"), "pembuat_event"],
          // [sequelize.col(""), "pembuat_event"]
        ],
        include: [
          {
            model: db.kategori_event,
            attributes: [],
          },
          {
            model: db.kota,
            attributes: [],
          },
          {
            model: db.user,
            attributes: [],
          },
        ],
        where: propertiFilter,
      });
      // console.log(data);
      res.status(200).send(data);
    } catch (error) {
      res.send(error.message);
    }
  },

  detailEvent: async (req, res) => {
    try {
      // kalo mau get itu kalo bisa jangan pakai bodi, usahakan pakai param atau query
      const { user_id, event_id } = req.query;

      if (user_id == "") {
        throw {
          isError: true,
          message: "Anda Harus Login Dulu",
        };
      }

      const dataEvent = await db.event.findOne({
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
          "kategori_event_id",
          "kota_id",
          "user_id",
          [sequelize.col("nama_kategori"), "kategori"],
          [sequelize.col("nama_kota"), "kota"],
          // [sequelize.col("nama_lengkap"), "pembuat_event"]
        ],
        include: [
          {
            model: db.kategori_event,
            attributes: [],
          },
          {
            model: db.kota,
            attributes: [],
          },
          {
            model: db.user,
            attributes: ["saldo", "point"],
          },
        ],
        where: { id: event_id },
      });

      const dataUser = await db.user.findOne({ where: { id: user_id } });
      res.status(200).send({
        dataEvent: dataEvent,
        dataUser: dataUser,
      });
    } catch (error) {
      res.status(409).send(error);
    }
  },

  createReview: async (req, res, next) => {
    try {
      const { comment, rate, user_id, event_id } = req.body;
      if (rate < 1 || rate > 5) {
        throw {
          isError: true,
          message: "Please select the rating before submitting",
        };
      }
      if (comment == "") {
        throw {
            isError: true,
            message: "Isi Bidang Kosong",
          };
      }
      const review = await db.comment.create({
        comment,
        rate,
        user_id,
        event_id,
      });
      res.status(200).send({
        isError: false,
        message: "Review successfully added!",
        data: review,
      });
    } catch (error) {
      next(error);
    }
  },

  dataComments : async (req, res, next) => {
    try {
        const {event_id} = req.params
        // console.log(event_id);
        const dataEvent = await db.event.findByPk(event_id)
        console.log(dataEvent);
        const dataComent = await db.comment.findAll({
            attributes : [
                "id", "comment", "rate", "user_id",
                [sequelize.col("nama_lengkap"), "pemberi_komentar"],
            ],
            include : [
                {
                    model : db.user,
                    attributes : []
                }
            ],
            where : {event_id},
            order : [["id", "DESC"]]
        })
        res.status(200).send(
            {dataComent, dataEvent}
        )
    } catch (error) {
        next(error)
    }
  },

  updateComent : async (req, res, next) => {
    try {
      const {idComent} = req.params
      const {comment, rate} = req.body
      // console.log(idComent);
      const findComent = await db.comment.findByPk(idComent)

      const updateComent = await db.comment.update(
        {...findComent, comment, rate}, {where : {id : idComent}}
      )
      res.status(200).send({
        isError : false,
        message : "Data Berhasil Di Update"
      })
    } catch (error) {
      next(error)
    }
  },

  deleteComent : async (req, res, next) => {
    try {
      const {idComent} = req.params
      // console.log(idComent);
      const data = await db.comment.destroy({where : {id : idComent}})
      res.status(201).send({
        isError : false,
        message : "Data Berhasil Dihapus"
      })
    } catch (error) {
      next(error)
    }
  }

};
