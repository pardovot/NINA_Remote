package com.nina_remote;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

// required for onCreate method
import android.os.Bundle;
import android.os.Build;
import android.view.WindowManager;
import com.facebook.react.modules.i18nmanager.I18nUtil;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "NINA_Remote";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
          WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
          layoutParams.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
          getWindow().setAttributes(layoutParams);
          getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
          getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
          I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
          sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
      }
       super.onCreate(savedInstanceState);
  }
}