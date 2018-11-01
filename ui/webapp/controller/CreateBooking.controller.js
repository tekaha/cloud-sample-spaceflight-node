sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("space.itineraries.company.ui.controller.CreateBooking", {
		_createNewEntity: function (oView, isOnInit) {
			var oModel = isOnInit ? this.getOwnerComponent().getModel() : oView.getModel(),
				oListBinding = oModel.bindList("/Bookings", undefined, undefined, undefined, {
					$$updateGroupId: "updateGroup"
				});

			var oContext = oListBinding.create({
				BookingNo: (Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)).toUpperCase(),
				CustomerName: "",
				EmailAddress: "",
				DateOfTravel: new Date().toJSON(),
				Cost: Math.floor((Math.random() * (3000 - 1000) + 1000)).toString(),
				NumberOfPassengers: 0,
				Itinerary_ID: "",
				PaymentInfo_CardNumber: ""
			});
			oView.setBindingContext(oContext);
		},
		onInit: function () {
			this._createNewEntity(this.getView(), true);
		},

		onBook: function () {
			var that = this,
				oView = this.getView(),
				oModel = oView.getModel();
			
			oModel.submitBatch("updateGroup");

			oView.getBindingContext().created().then(function () {
				MessageToast.show("Booking created");
				that._createNewEntity(oView, false);
			});
		}
	});
});