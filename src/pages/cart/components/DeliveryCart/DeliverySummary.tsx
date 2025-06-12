import TransitionLink from '@/components/TransitionLink';
import { ReactNode } from 'react';
import { List } from 'zmp-ui';

function DeliverySummary(props: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  linkTo?: string;
}) {
  return (
    <List.Item
      prefix={props.icon}
      suffix={
        props.linkTo && (
          <TransitionLink
            to={props.linkTo}
            state={{ from: 'checkout' }}
            className="text-xs text-primary"
          >
            Thay đổi
          </TransitionLink>
        )
      }
      title={props.title}
    >
      <div className="flex-1 flex flex-col space-y-0.5">
        {props.subtitle && <span className="text-sm">{props.subtitle}</span>}
        {props.description && <span className="text-xs text-inactive">{props.description}</span>}
      </div>
    </List.Item>
  );
}

export default DeliverySummary;
