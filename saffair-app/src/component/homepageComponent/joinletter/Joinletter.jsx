import "./joinletter.css";

export default function Joinletter() {
  return (
    <div className="joinletter">
      <div className="Newsletter">
        <p className="uptodate">Stay up to date</p>
        <p className="newst1">Join our Newsletter</p>
        <input
          className="emailbtn"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email.."
        ></input>
        <button className="submit">Submit</button>
        <p className="letterFooter">*You can unsubscribe anytime</p>
      </div>
      <div className="letterdesign">
        <div className="letterdesign1"></div>
        <div className="letterdesign2"></div>
        <div className="letterdesign3"></div>
      </div>
    </div>
  );
}
