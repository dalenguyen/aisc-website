export default () => {
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="X5XZA8RRQNSWS" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
        name="submit"
        style={{ borderWidth: 0 }}
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button" />
      <img
        alt=""
        style={{ borderWidth: 0 }}
        src="https://www.paypal.com/en_CA/i/scr/pixel.gif"
        width="1"
        height="1" />
    </form>
  )
}