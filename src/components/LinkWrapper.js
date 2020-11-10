import Link from 'next/link'

const LinkWrapper = ({ children, href }) => (
	<Link href={href}>
		<a>{children}</a>
	</Link>
)

export default LinkWrapper;
