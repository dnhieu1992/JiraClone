<#import "template.ftl" as layout>

<@layout.registrationLayout displayInfo=false displayMessage=message?has_content; section>
  <#if section == "header">
  <#elseif section == "form">
    <div class="jira-card">
      <div class="jira-card-header">
        <div class="jira-logo">
          <img src="${url.resourcesPath}/img/logo.svg" alt="Jira" />
          <span>Jira</span>
        </div>
        <h1 class="jira-title">Log in to continue</h1>
        <p class="jira-subtitle">Use your email and password to sign in.</p>
      </div>
      <#if message?has_content>
        <div class="jira-alert" role="alert">
          ${kcSanitize(message.summary)?no_esc}
        </div>
      </#if>
      <form id="kc-form-login" class="jira-form" onsubmit="return true;" action="${url.loginAction}" method="post">
        <div class="jira-field">
          <label for="username">Email <span class="jira-required">*</span></label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            placeholder="Enter your email"
            value="${login.username!''}"
            autofocus
            required
          />
        </div>

        <div class="jira-field">
          <label for="password">Password <span class="jira-required">*</span></label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter your password"
            required
          />
        </div>

        <#if realm.rememberMe>
          <div class="jira-remember">
            <input type="checkbox" id="rememberMe" name="rememberMe" <#if login.rememberMe??>checked</#if> />
            <label for="rememberMe">Remember my login</label>
          </div>
        </#if>

        <#if credentialId??>
          <input type="hidden" name="credentialId" value="${credentialId}" />
        </#if>

        <button class="jira-submit" name="login" id="kc-login" type="submit">Continue</button>

        <div class="jira-links">
          <#if realm.resetPasswordAllowed>
            <a href="${url.loginResetCredentialsUrl}">Can't log in?</a>
          </#if>
          <#if realm.registrationAllowed>
            <a href="${url.registrationUrl}">Create account</a>
          </#if>
        </div>
      </form>
    </div>
  </#if>
</@layout.registrationLayout>
