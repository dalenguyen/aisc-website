import './donate-button.scss'
import { ReactNode } from 'react';


export const DonateForm = ({ className, children }: {
  className?: string, children?: ReactNode
}) => {
  return (
    <div className={className}>
      <form action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_blank" className="donate-form">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="X5XZA8RRQNSWS" />
        {children}
      </form>
    </div>
  );
}


export default ({ className }: { className?: string }) => {
  return (
    <DonateForm className={className}>
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
        name="submit"
        style={{ borderWidth: 0 }}
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button" />
    </DonateForm>
  )
}