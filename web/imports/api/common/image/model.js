import cloudinary from "cloudinary";
import Promise from "bluebird";
//TODO: Move this to common


export class ImageModel {

    async upload(path) {


        const config = {
            width: 240,
            height: 240,
            crop: "thumb",
            eager: [
                {width: 120, height: 120, crop: "thumb",}
            ]
        };

        return new Promise(function (resolve, reject) {
            cloudinary.uploader.upload(path, function (result, error) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            }, config);
        })
    }

    static setDefaultLogo(logo) {
        const defaultLogo = { "default": "/img/female.jpg", "large" :  "/img/female.jpg"  };
        if (!logo) {
            logo = defaultLogo;
        }
        else {
            //check if there is a value for default
            if (!logo.default) {
                logo = defaultLogo
            }
        }

        return logo;

    }
}
