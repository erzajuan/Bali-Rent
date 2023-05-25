const { order, user, car, rentHouse } = require("../models");
const midtransClient = require("midtrans-client");

class OrderController {
  static async getOrder(req, res) {
    try {
      let result = await order.findAll({ include: [user, car, rentHouse] });
      res.status(200).json({
        status: true,
        message: "Berhasil mendapatkan data",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal mendapatkan data",
        data: error,
      });
    }
  }

  static addOrder(req, res) {
    const userId = req.userData.id;
    const { username, email, phoneNumber } = req.userData;
    const { orderDate, startDate, finishDate, carId, amount, payment } =
      req.body;

    let core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: "SB-Mid-server-CYnctik_7Mo78H7k82fjTQ1L",
      clientKey: "SB-Mid-client-HQdGV8k89CVHwlx5",
    });

    let parameter = {
      payment_type: "bank_transfer",
      bank_transfer: {
        bank: payment,
      },
      transaction_details: {
        order_id: `${username}-${carId}-${amount}`,
        gross_amount: +amount,
      },
      customer_details: {
        first_name: username,
        email: email,
        phone: phoneNumber,
      },
    };

    core
      .charge(parameter)
      .then((chargeResponse) => {
        car.findOne({ where: { id: carId } }).then((data) => {
          order
            .create({
              orderDate,
              startDate,
              finishDate,
              carId,
              userId,
              rentHouseId: data.rentHouseId,
              paymentId: chargeResponse.order_id,
              transactionStatus: chargeResponse.transaction_status,
              responseMidtrans: JSON.stringify(chargeResponse),
            })
            .then(() => {
              car.update(
                {
                  status: "Not-Available",
                },
                { where: { id: carId } }
              );
              res.status(201).json({
                status: true,
                message: "Berhasil membuat order",
                data: chargeResponse,
              });
            });
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: false,
          message: "Gagal membuat order",
          error: error,
        });
      });
  }

  static async detail(req, res) {
    try {
      const id = +req.userData.id;

      let result = await order.findByPk(id, {
        include: [user, car, rentHouse],
      });
      res.status(200).json({
        status: true,
        message: "Berhasil mendapatkan data",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal mendapatkan data",
        error: error,
      });
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      let cekOrder = await order.findOne({ where: { id }, include: [car] });

      await car.update(
        { status: "Available" },
        { where: { id: cekOrder.car.id } }
      );

      let result = await order.destroy({ where: { id } });
      result == 1
        ? res.status(200).json({
            status: true,
            message: `Order dengan id ${id} berhasil dihapus`,
          })
        : res.status(404).json({
            status: false,
            message: `Order dengan id ${id} gagal dihapus`,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal menghapus data",
        error: error,
      });
    }
  }

  // static status(req, res) {
  //   apiClient.transaction
  //     .notification(notificationJson)
  //     .then((statusResponse) => {
  //       let orderId = statusResponse.order_id;
  //       let transactionStatus = statusResponse.transaction_status;
  //       let responseMidtrans = JSON.stringify(statusResponse);

  //       order.update(
  //         {
  //           transactionStatus: transactionStatus,
  //           responseMidtrans: responseMidtrans,
  //         },
  //         { where: { paymentId: orderId } }
  //       );
  //     });
  //   res
  //     .status(200)
  //     .json({ message: "Sudah Melakukan Pembayaran" })
  //     .catch((error) => {
  //       res.status(200).json({ message: "Gagal Melakukan Pembayaran", error });
  //     });
  // }

  static cekStatus(req, res) {
    const paymentId = req.params.paymentId;

    let core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: "SB-Mid-server-CYnctik_7Mo78H7k82fjTQ1L",
      clientKey: "SB-Mid-client-HQdGV8k89CVHwlx5",
    });

    core.transaction
      .status(paymentId)
      .then((response) => {
        let transactionStatus = response.transaction_status;
        let responseMidtrans = JSON.stringify(response);

        order
          .update(
            {
              transactionStatus: transactionStatus,
              responseMidtrans: responseMidtrans,
            },
            {
              where: {
                paymentId: paymentId,
              },
            }
          )
          .then((result) => {
            result == 1
              ? res.status(200).json({
                  status: true,
                  message: `Order dengan id ${paymentId} berhasil diupdate`,
                })
              : res.status(404).json({
                  status: false,
                  message: `Order dengan id ${paymentId} tidak ditemukan`,
                });
          });
      })
      .catch((error) => {
        res.status(500).json({
          status: false,
          message: "Gagal mendapatkan data",
          error: error,
        });
      });
  }
}

module.exports = OrderController;
