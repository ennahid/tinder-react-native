package com.tinderreact;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.checkbox.ReactCheckBoxPackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.ijzerenhein.sharedelement.RNSharedElementPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactCheckBoxPackage(),
            new ReactNativeDialogsPackage(),
            new PickerPackage(),
            new RNSharedElementPackage(),
            new SafeAreaContextPackage(),
            new RNScreensPackage(),
            new ReanimatedPackage(),
            new ImagePickerPackage(),
            new SvgPackage(),
            new AsyncStoragePackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
            
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
