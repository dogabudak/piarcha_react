// AppDelegate.mm
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
@import FBSDKCoreKit;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Google Maps
  [GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"];

  // FBSDK init (optional but recommended)
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

  // RN entry
  self.moduleName = @"piarcha_react";   // JS app name
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// URL handling (FB login / deep links) for non-Scene setups
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:app
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  return handled || [super application:app openURL:url options:options];
}

// URL handling for iOS 13+ Scene-based setups (covers all cases)
- (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts
{
  UIOpenURLContext *context = URLContexts.allObjects.firstObject;
  if (context) {
    [[FBSDKApplicationDelegate sharedInstance] application:UIApplication.sharedApplication
                                                   openURL:context.URL
                                         sourceApplication:nil
                                                annotation:@{}];
  }
}

@end
