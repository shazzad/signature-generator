<template>
  <div id="integrations">
    <h2>Add signature in Outlook</h2>
    <ol>
      <li>Copy your signature and open the latest version of Outlook.</li>
      <li>Click on New Message.</li>
      <li>Select Signature>Manage Signatures.</li>
      <li>Select the + sign, paste your signature and give it a name in Signature Name field.</li>
      <li>Click save.</li>
    </ol>

    <h2>Add signature in Gmail</h2>
    <ol>
      <li>Insert an Email Signature in Gmail.</li>
      <li>Select the Settings gear in your Gmail toolbar.</li>
      <li>Select Settings > General.</li>
      <li>Make sure the desired account is selected under Signature.</li>
      <li>Type the desired signature in the text field.</li>
      <li>Select Save Changes.</li>
      <li>Gmail will now insert the signature automatically when you compose a message.</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'SignatureIntegrations'
}