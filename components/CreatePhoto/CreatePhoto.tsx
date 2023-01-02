import React, { useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from "react-native";

interface IProps {
  setPhoto: (v: string) => void;
}

const CreatePhoto: React.FC<IProps> = ({ setPhoto }) => {
  const [camera, setCamera] = useState<any>();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };
  const options = {
    quality: 1,
    exif: false,
  };
  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync(options);
    setPhoto(uri);
  };

  return (
    <TouchableHighlight style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        <TouchableOpacity
          onPress={() => {
            takePhoto();
          }}
          style={styles.snapContainer}
        >
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType}>
          <Text>Flip Camera</Text>
        </TouchableOpacity>
      </Camera>
    </TouchableHighlight>
  );
};

export default CreatePhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Math.round(Dimensions.get("window").width + Dimensions.get("window").height) / 2,
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 50,
    alignSelf: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  snapContainer: {
    marginTop: "70%",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#FFC612",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  snap: {
    color: "white",
  },
});
